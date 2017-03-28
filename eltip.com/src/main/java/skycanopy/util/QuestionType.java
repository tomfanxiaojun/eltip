package skycanopy.util;

public enum QuestionType {
	//填空题
	INPUT(100),
	// 单选题目
	SINGLE_CHOICE(200),
	MUIT_CHOICE(300);
	//多选题目
	private int value;
	private QuestionType(int value) {
		this.value = value;
	}
	public static QuestionType fromValue(int value) {
		for (QuestionType questionType : QuestionType.values()) {
			if (questionType.value == value) {
				return questionType;
			}
		}
		throw new IllegalArgumentException("Cannot create evalue from value: " + value + "!");
	}
	public int toValue() {
		return value;
	}
	
}
