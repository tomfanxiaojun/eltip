package cn.system.service;

import java.util.List;

import cn.system.model.questions.Question;
import cn.system.model.questions.QuestionItem;
import cn.system.model.questions.TesetPaperType;

public interface IQuestionService {
	public List<Question> findQuestion(Question question);
	public void deleteByIds(List<Integer> ids);
	public int addQuestion(Question question);
	public void updateQuestion(Question question);
	public List<QuestionItem> findQuestionItems(List<Integer> qids);
	public void deleteItemById(Integer id);
	public List<Question> getPaperQuestions(Integer experientId,TesetPaperType tesetPaperTypes);
}
