package cn.system.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.system.mapping.TestPaperDao;
import cn.system.model.questions.Question;
import cn.system.model.questions.QuestionItem;
import cn.system.model.questions.QuestionType;
import cn.system.model.questions.TesetPaperType;
import cn.system.model.questions.TestPaper;
import cn.system.service.ITestPaperService;
@Service("testPaperService")
public class TestPaperService implements ITestPaperService{
	@Autowired
	private TestPaperDao testPaperDao;
	@Override
	public List<TestPaper> findTestPaper(TestPaper testPaper) {
		// TODO Auto-generated method stub
		List<TestPaper> listPapers= testPaperDao.findTestPaper(testPaper);
		List<Integer> qids =new ArrayList();
		for(int i=0;i<listPapers.size();i++){
			qids.add(listPapers.get(i).getId());
		}
		if(qids.size()>0){
			List<TesetPaperType> listItems=findTestPaperTypes(qids);
			for(int i=0;i<listPapers.size();i++){
			
				List<TesetPaperType> its=new ArrayList();
				for(int j=0;j<listItems.size();j++){
					int id=listItems.get(j).getType();
					listItems.get(j).setQuestionType(QuestionType.getQuestionTypeByID(id));
					if(listPapers.get(i).getId()==listItems.get(j).getPid()){
						its.add(listItems.get(j));					
					}
				}
				listPapers.get(i).setTypes(its);
			}
		}
		return listPapers;
	}
	@Override
	public List<TesetPaperType> findTestPaperTypes(List<Integer> qids) {
		//List<Question> questions=questionDao.findQuestion(question);	
		return testPaperDao.findTestPaperTypes(qids);
	}
	@Override
	public int addTestPaper(TestPaper testPaper) {
		// TODO Auto-generated method stub
		testPaperDao.addTestPaper(testPaper);
		int pid=testPaper.getId();
		for(int i=0;i<testPaper.getTypes().size();i++){
			testPaper.getTypes().get(i).setPid(pid);		
		}
		testPaperDao.addItems(testPaper.getTypes());		
		return pid;		 
	}
	@Override
	public void addItems(List<TesetPaperType> tesetPaperTypes) {
		// TODO Auto-generated method stub
		testPaperDao.addItems(tesetPaperTypes);
	}
	@Override
	public void deleteItemByIds(List<Integer> ids) {
		// TODO Auto-generated method stub
		testPaperDao.deleteItemByIds(ids);
		
	}
	@Override
	public void updateItem(TesetPaperType testPaperType) {
		// TODO Auto-generated method stub
		testPaperDao.updateItem(testPaperType);
		
	}
	@Override
	public void updatePaper(TestPaper testPaper) {
		// TODO Auto-generated method stub
		testPaperDao.updatePaper(testPaper);		
		int pid=testPaper.getId();
		List<TesetPaperType> addItems=new ArrayList();
		for(int i=0;i<testPaper.getTypes().size();i++){
			TesetPaperType item=testPaper.getTypes().get(i);			
			if(item.getId()!=null){// update				
				testPaperDao.updateItem(item);				 
			}else{
				addItems.add(item);
			}
		}
		if(addItems.size()>0){
			for(int i=0;i<addItems.size();i++){
				addItems.get(i).setPid(pid);
			}
			testPaperDao.addItems(addItems);
		}	
	}
	@Override
	public void deletePaperByIds(List<Integer> ids) {
		testPaperDao.deletePaperByIds(ids);
		
	}

}
