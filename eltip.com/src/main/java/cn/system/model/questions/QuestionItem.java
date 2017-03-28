package cn.system.model.questions;

public class QuestionItem {
	private Integer id;
	private Integer questionId;
	private String name;
	private Byte isTure;
	private String value;
	public QuestionItem() {
		super();
	}	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getQuestionId() {
		return questionId;
	}
	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Byte getIsTure() {
		return isTure;
	}
	public void setIsTure(Byte isTure) {
		this.isTure = isTure;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}