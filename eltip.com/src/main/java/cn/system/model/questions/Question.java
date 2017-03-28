package cn.system.model.questions;

import java.util.List;

public class Question {
	private Integer id;
	private Integer exprimentId;
	private String title;
	private Integer type;
	private QuestionType questionType;
	private List<QuestionItem> questionItems;
	public List<QuestionItem> getQuestionItems() {
		return questionItems;
	}
	public void setQuestionItems(List<QuestionItem> questionItems) {
		this.questionItems = questionItems;
	}
	public QuestionType getQuestionType() {
		return questionType;
	}
	public void setQuestionType(QuestionType questionType) {
		this.questionType = questionType;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getExprimentId() {
		return exprimentId;
	}
	public void setExprimentId(Integer exprimentId) {
		this.exprimentId = exprimentId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	} 
}
