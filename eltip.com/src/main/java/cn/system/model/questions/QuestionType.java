package cn.system.model.questions;

import java.util.ArrayList;
import java.util.List;

public class QuestionType {
	private Integer id;
	private String name;
	private QuestionType(Integer id,String name){
		this.id=id;
		this.name=name;
	}
	public static List<QuestionType> getAllQuestionTypes(){
		List<QuestionType> questionType = new ArrayList();
		questionType.add(new QuestionType(1,"单选题"));
		questionType.add(new QuestionType(2,"多选题"));
		questionType.add(new QuestionType(3,"判断题"));
		questionType.add(new QuestionType(4,"填空题"));
		return questionType;
	}
	public static QuestionType getQuestionTypeByID(Integer id){
		List<QuestionType> types=getAllQuestionTypes();
		for(int i=0;i<types.size();i++){
			if(types.get(i).getId()==id){
				return types.get(i);
			}
		}
		return null;
		
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
