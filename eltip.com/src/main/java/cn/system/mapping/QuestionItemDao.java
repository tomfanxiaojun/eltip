package cn.system.mapping;

import java.util.List;

import cn.system.model.questions.Question;
import cn.system.model.questions.QuestionItem;

public interface QuestionItemDao {
	public void addItems(List<QuestionItem> questionItems);
	public List<QuestionItem> findQuestionItems(List<Integer> qids);
	public void deleteById(Integer id);
	public void update(QuestionItem questionItem);
}
