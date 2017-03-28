package cn.system.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import cn.system.model.questions.Question;

public interface QuestionDao {
	public List<Question> findQuestion(Question question);
	public void deleteByIds(List<Integer> ids);
	public int addQuestion(Question question);
	public void update(Question question);
	@Select("select * from t_question where exprimentId=#{experientId} and type=#{type} order by RAND() limit #{count} ") 
	public List<Question> getPaperQuestions(@Param("experientId")Integer experientId,
			@Param("type")Integer type,@Param("count")Integer count);
}
