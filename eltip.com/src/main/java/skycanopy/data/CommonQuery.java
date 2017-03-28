package skycanopy.data;

import java.util.List;


public class CommonQuery {
	private String makeSingleCondition(SingleCondition condition, HqlCondition hqlCondition) {
		StringBuilder result = new StringBuilder();
		
		result.append(condition.getName());

		switch(condition.getQueryType()) {
			case EQUAL:
				result.append(" = ");
				break;
			case NOTEQUAL:
				result.append(" <> ");
				break;
			case GREATER:
				result.append(" > ");
				break;
			case LESS:
				result.append(" < ");
				break;
			case GREATEROREQUAL:
				result.append(" >= ");
				break;
			case LESSOREQUAL:
				result.append(" <= ");
				break;
			case CONTAIN:
				result.append(" like ");
				break;
			case NOTCONTAIN:
				result.append(" not like ");
				break;
		}
		
		result.append(":");
		result.append(condition.getName());
		hqlCondition.add(condition.getName(), condition.getValue());
		
		return result.toString();
	}
	
	private String makeComplexCondition(ComplexCondition complexCondition, HqlCondition hqlCondition) {
		boolean isFirst = true;
		StringBuilder result = new StringBuilder();
		List<WhereCondition> conditionList = complexCondition.getList();
		
		for (WhereCondition condition : conditionList) {
			if (condition instanceof SingleCondition) {
				SingleCondition sc = (SingleCondition)condition;
				String retval = makeSingleCondition(sc, hqlCondition);
				
				if (!isFirst) {
					if (sc.getType() == ConditionType.AND) {
						result.append(" and ");
					} else {
						result.append(" or ");
					}
				}
				
				result.append(retval);
			} else {
				ComplexCondition cc = (ComplexCondition)condition;
				String retval = makeComplexCondition(cc, hqlCondition);
				
				if (!isFirst) {
					if (cc.getType() == ConditionType.AND) {
						result.append(" and ");
					} else {
						result.append(" or ");
					}
				}
				
				result.append(" (");
				result.append(retval);
				result.append(") ");
			}
			
			isFirst = false;
		}
		
		return result.toString();
	}
	
	private String makeCondition(WhereCondition whereCondition, HqlCondition hqlCondition) {
		String result = "";
		
		if (whereCondition instanceof ComplexCondition) {
			result = makeComplexCondition((ComplexCondition)whereCondition, hqlCondition);
		} else if (whereCondition instanceof SingleCondition) {
			result = makeSingleCondition((SingleCondition)whereCondition, hqlCondition);
		}
		
		return result;
	}

	public HqlCondition makeHqlCondition(String objectName, WhereCondition whereCondition) {
		HqlCondition hqlCondition = new HqlCondition();
		String retval = makeCondition(whereCondition, hqlCondition);
		StringBuilder hql = new StringBuilder();
		
		hql.append(" From ");
		hql.append(objectName);
		
		if (!retval.isEmpty()) {
			hql.append(" Where ");
			hql.append(retval);
		}
		
		hqlCondition.setHqlString(hql.toString());
		
		return hqlCondition;
	}

}
