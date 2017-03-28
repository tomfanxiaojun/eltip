package cn.system.model.questions;

import java.util.List;

public class TestPaper {
	private Integer id;
	private Integer exprimentId;
	private String title;
	private Integer passScore;
	private Integer total;
	private List<TesetPaperType> types;
	private Integer testCount;
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
	public Integer getPassScore() {
		return passScore;
	}
	public void setPassScore(Integer passScore) {
		this.passScore = passScore;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public List<TesetPaperType> getTypes() {
		return types;
	}
	public void setTypes(List<TesetPaperType> types) {
		this.types = types;
	}
	public Integer getTestCount() {
		return testCount;
	}
	public void setTestCount(Integer testCount) {
		this.testCount = testCount;
	}
}
