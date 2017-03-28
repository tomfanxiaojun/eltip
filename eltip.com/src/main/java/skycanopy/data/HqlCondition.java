package skycanopy.data;

import java.util.HashMap;
import java.util.Map;

public class HqlCondition {
	private String hqlString;
	private String orderString;
	private Map<String, Object> map = new HashMap<String, Object>();;

	public HqlCondition() {
	}

	public HqlCondition(String hqlString) {
		this.hqlString = hqlString;
	}
	
	public HqlCondition(String hqlString, String orderString) {
		this.hqlString = hqlString;
		this.orderString = orderString;
	}
	
	public String getHqlString() {
		return hqlString;
	}

	public void setHqlString(String hql) {
		this.hqlString = hql;
	}
	
	public String getOrderString() {
		return this.orderString;
	}

	public void setOrderString(String orderString) {
		this.orderString = orderString;
	}

	public Map<String, Object> getMap() {
		return map;
	}
	
	public void add(String name, Object value) {
		map.put(name, value);
	}
	
	public void remove(String name) {
		map.remove(name);
	}
}
