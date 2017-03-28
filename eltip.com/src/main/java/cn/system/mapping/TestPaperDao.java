package cn.system.mapping;

import java.util.List;

import cn.system.model.questions.Question;
import cn.system.model.questions.QuestionItem;
import cn.system.model.questions.TesetPaperType;
import cn.system.model.questions.TestPaper;

public interface TestPaperDao {
	public List<TestPaper> findTestPaper(TestPaper testPaper);
	public List<TesetPaperType> findTestPaperTypes(List<Integer> qids);
	public int addTestPaper(TestPaper testPaper);
	public void addItems(List<TesetPaperType> tesetPaperTypes);
	public void deleteItemByIds(List<Integer> ids);
	public void deletePaperByIds(List<Integer> ids);	
	public void updateItem(TesetPaperType testPaperType);
	public void updatePaper(TestPaper testPaper);
	
}
