package skycanopy.data;

import java.util.List;

public class ComplexCondition extends WhereCondition {
	protected List<WhereCondition> conditionList;
	
	public void add(WhereCondition condition) {
		conditionList.add(condition);
	}
	
	public List<WhereCondition> getList() {
		return conditionList;
	}
}