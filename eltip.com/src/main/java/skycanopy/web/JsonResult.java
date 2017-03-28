package skycanopy.web;

import java.io.Serializable;

@SuppressWarnings("serial")
public class JsonResult implements Serializable {

	/**
	 * 数据
	 */
	private Object data;
	/**
	 * 信息
	 */
	private String message;
	/**
	 * 是否成功
	 */
	private boolean success;
	
	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean getSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public JsonResult() {
		this.success = true;
	}

	public JsonResult(Object data) {
		this.data = data;
		this.success = true;
	}
	
	public JsonResult(boolean success, String message) {
		this.message = message;
		this.success = success;
	}
	
	public JsonResult(boolean success, String message, Object data) {
		this.data = data;
		this.message = message;
		this.success = success;
	}

}
