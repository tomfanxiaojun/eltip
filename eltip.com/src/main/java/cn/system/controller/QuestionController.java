package cn.system.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import skycanopy.util.Authentication;
import skycanopy.util.Role;
import skycanopy.web.BaseController;
import skycanopy.web.JsonResult;
import cn.system.model.questions.Question;
import cn.system.model.questions.QuestionItem;
import cn.system.model.questions.QuestionType;
import cn.system.model.questions.TesetPaperType;
import cn.system.model.questions.TestPaper;
import cn.system.service.IQuestionService;
import cn.system.service.ITestPaperService;
@Controller
@RequestMapping("question")
@Authentication({Role.USER})
public class QuestionController extends BaseController {
	@Autowired
	private IQuestionService questionService;
	@Autowired
	private ITestPaperService testPaperService;
	@RequestMapping("get_question_types")
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult getQuestionTypes(){	
		List<QuestionType> questionTypes=QuestionType.getAllQuestionTypes();		
		return new JsonResult(true,"ok",questionTypes);
	}
	@RequestMapping("get_questions")
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult getQuestions(Question question){	
		List<Question> questions=questionService.findQuestion(question);		
		return new JsonResult(true,"ok",questions);
	}
	@RequestMapping("get_papers")
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult getPapers(TestPaper testPaper){
		List<TestPaper> lists=testPaperService.findTestPaper(testPaper);		
		return new JsonResult(true,"ok",lists);
	}
	@RequestMapping(value="delete_questions",method = RequestMethod.POST)
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult deleteQuestion(@RequestBody List<Integer> ids){		
		questionService.deleteByIds(ids);
		return new JsonResult(true,"ok");
	}
	@RequestMapping(value="delete_question_item",method = RequestMethod.POST)
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult deleteQuestionItem(Integer id){		
		questionService.deleteItemById(id);
		return new JsonResult(true,"ok");
	}
	@RequestMapping(value="add_question")
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult addQuestion(Integer eid,Question question,String items){		
		 JSONArray myJsonArray = JSONArray.fromObject(items);
		 List<QuestionItem> questionItems=new ArrayList();
		 for (int i = 0; i < myJsonArray.size(); i++) {  
			 JSONObject  obj= myJsonArray.getJSONObject(i);
			 QuestionItem item = (QuestionItem)JSONObject.toBean(obj,QuestionItem.class);//将建json对象转换为Person对象  
			 questionItems.add(item);
		 }
		 question.setQuestionItems(questionItems);	
		 //updateQuestion
		 if(question.getId()!=null){
			 questionService.updateQuestion(question);
		 }else {
			 questionService.addQuestion(question);				 		 
		 }	
		 Question q=new Question();
		 q.setExprimentId(eid);	
		 List<Question> questions=questionService.findQuestion(q);
		 return new JsonResult(true,"ok",questions);
		 
	}
	@RequestMapping(value="add_paper")
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult addPaper(Integer eid,TestPaper testPaper,String items){		
		 JSONArray myJsonArray = JSONArray.fromObject(items);
		 List<TesetPaperType> types=new ArrayList();
		 List<Integer> deleteTypes=new ArrayList();
		 for (int i = 0; i < myJsonArray.size(); i++) {  
			 JSONObject  obj= myJsonArray.getJSONObject(i);
			 TesetPaperType item = (TesetPaperType)JSONObject.toBean(obj,TesetPaperType.class);//将建json对象转换为Person对象  
			 if(testPaper.getId()!=null&&!item.isChecked()){
				 deleteTypes.add(item.getId());
			 }else{
				 types.add(item);
			 }
			
		 }
		 testPaper.setTypes(types);
		 //updateQuestion
		 if(testPaper.getId()!=null){
			 // remove items;
			 if(deleteTypes.size()>0){
				 testPaperService.deleteItemByIds(deleteTypes);
			 }
			 // update			 
			 testPaperService.updatePaper(testPaper);
		 }else {
			 testPaperService.addTestPaper(testPaper);		 		 
		 }	
		 TestPaper q=new TestPaper();
		 q.setExprimentId(eid);	
		 List<TestPaper> questions=testPaperService.findTestPaper(q);
		 return new JsonResult(true,"ok",questions);
		 
	}
	@RequestMapping(value="delete_papers",method = RequestMethod.POST)
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult deletePaper(@RequestBody List<Integer> ids){		
		testPaperService.deletePaperByIds(ids);
		return new JsonResult(true,"ok");
	}
	@RequestMapping(value="view_paper")
	@ResponseBody
	@Authentication({Role.EVERYONE})
	public JsonResult viewPaper(Integer id){		
		TestPaper testPaper =new TestPaper();
		testPaper.setId(id);
		List<TestPaper> lists=testPaperService.findTestPaper(testPaper);	
		if(lists.size()<1){
			return new JsonResult(true,"fail");
		}
		List<Question> questions =new ArrayList();
		TestPaper tp =lists.get(0);
		for(int i=0;i<tp.getTypes().size();i++){			
			List<Question> iq=questionService.getPaperQuestions(tp.getExprimentId(), tp.getTypes().get(i));
			questions.addAll(iq);
		}
		List<Integer> qids =new ArrayList();
		for(int i=0;i<questions.size();i++){
			qids.add(questions.get(i).getId());
		}
		HashMap map =new HashMap();
		if(qids.size()>0){
			List<QuestionItem> listItems=questionService.findQuestionItems(qids);
			for(int i=0;i<questions.size();i++){
				int tid=questions.get(i).getType();
				questions.get(i).setQuestionType(QuestionType.getQuestionTypeByID(tid));
				List<QuestionItem> its=new ArrayList();
				for(int j=0;j<listItems.size();j++){
					if(questions.get(i).getId()==listItems.get(j).getQuestionId()){
						its.add(listItems.get(j));					
					}
				}
				questions.get(i).setQuestionItems(its);
				int t =questions.get(i).getQuestionType().getId();
				if(map.containsKey(t)){					
					List<Question> qs=(List<Question>) map.get(t);
					qs.add(questions.get(i));
					map.put(t, qs);
				}else {
					List<Question> qs= new ArrayList();
					qs.add(questions.get(i));
					map.put(t, qs);
				}
			}
		}	
		
		return new JsonResult(true,"ok",map);
		 
	}
}
