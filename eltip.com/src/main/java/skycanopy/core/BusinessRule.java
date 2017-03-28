package skycanopy.core;

public enum BusinessRule {
	UNKNOW("R000", "未知的错误"),
	DATAEXPIRED("R001", "数据已过期,或对象不存在"),
	DATAREPEAT("R002", "不允许重复数据"),
	HASREFERENCE("R003", "存在对此对象的依赖"),
	INVALIDOPERATION("R004", "无效操作"),
	INVALIDSIGNATURE("R005", "无效的凭证"),
	NOPERMISSION("R006", "无操作权限"),
	OBJECTNOTFOUND("R007", "对象不存在"),
	OUTOFRANGE("R008", "超出对象的取值范围"),
	REQUIRED("R009", "指定的属性是必须的");
	
	private String code;
	private String message;
	
	BusinessRule(String code, String message) {
		this.code = code;
		this.message = message;
	}
	
	public String getCode() {
		return code;
	}
	
	public String getMessage() {
		return message;
	}
}
