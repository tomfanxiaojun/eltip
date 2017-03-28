package cn.system.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.system.mapping.QuestionDao;
import cn.system.mapping.QuestionItemDao;
import cn.system.model.questions.Question;
import cn.system.model.questions.QuestionItem;
import cn.system.model.questions.QuestionType;
import cn.system.model.questions.TesetPaperType;
import cn.system.service.IQuestionService;
@Service("questionService")
public class QuestionService implements IQuestionService{
	@Autowired
	private QuestionDao questionDao;
	@Autowired
	private QuestionItemDao questionItemDao;
	@Override
	public List<Question> findQuestion(Question question) {	
		List<Question> questions=questionDao.findQuestion(question);		
		List<Integer> qids =new ArrayList();
		for(int i=0;i<questions.size();i++){
			qids.add(questions.get(i).getId());
		}		
		if(qids.size()>0){
			List<QuestionItem> listItems=findQuestionItems(qids);
			for(int i=0;i<questions.size();i++){
				int id=questions.get(i).getType();
				questions.get(i).setQuestionType(QuestionType.getQuestionTypeByID(id));
				List<QuestionItem> its=new ArrayList();
				for(int j=0;j<listItems.size();j++){
					if(questions.get(i).getId()==listItems.get(j).getQuestionId()){
						its.add(listItems.get(j));					
					}
				}
				questions.get(i).setQuestionItems(its);
			}
		}
		return  questions;
	}
	@Override
	public void deleteByIds(List<Integer> ids) {
		questionDao.deleteByIds(ids);
		
	}
	@Override
	public int addQuestion(Question question) {
		questionDao.addQuestion(question);
		int questionID=question.getId();
		for(int i=0;i<question.getQuestionItems().size();i++){
			question.getQuestionItems().get(i).setQuestionId(questionID);			
		}
		questionItemDao.addItems(question.getQuestionItems());		
		return questionID;
		
		
	}
	@Override
	public List<QuestionItem> findQuestionItems(List<Integer> qids) {		
		return questionItemDao.findQuestionItems(qids);
	}
	@Override
	public void deleteItemById(Integer id) {
		questionItemDao.deleteById(id);
		
	}
	@Override
	public void updateQuestion(Question question) {
		questionDao.update(question);
		int questionID=question.getId();
		List<QuestionItem> addItems=new ArrayList();
		for(int i=0;i<question.getQuestionItems().size();i++){
			QuestionItem item=question.getQuestionItems().get(i);			
			if(item.getId()!=null){// update				
				questionItemDao.update(item);				 
			}else{
				addItems.add(item);
			}
		}
		if(addItems.size()>0){
			for(int i=0;i<addItems.size();i++){
				addItems.get(i).setQuestionId(questionID);
			}
			questionItemDao.addItems(addItems);
		}	
		
	}
	@Override
	public List<Question> getPaperQuestions(Integer experientId,
			TesetPaperType tesetPaperTypes) {		 
		return questionDao.getPaperQuestions(experientId,tesetPaperTypes.getType(),tesetPaperTypes.getCount());
		
	}

}
