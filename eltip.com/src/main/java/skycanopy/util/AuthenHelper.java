package skycanopy.util;

import javax.servlet.http.HttpSession;

import skycanopy.core.BusinessException;
import skycanopy.web.HttpContext;

public class AuthenHelper {
	public static final String ROLE = "__System_Role";
	public static final String USER = "__System_User";
	public static final String ENTERPRISEID = "__System_EnterpriseId";
	public static final String FLAG = "__System_Flag";
	
	public static Role getRole() {
		HttpSession session = HttpContext.getSession();
		
		return (Role)session.getAttribute(ROLE);
	}
	
	public static void SetRole(Role role) {
		HttpSession session = HttpContext.getSession();
		
		session.setAttribute(ROLE, role);
	}
	
	public static Object getUser() {
		HttpSession session = HttpContext.getSession();
		Object result = session.getAttribute(USER);
		
		if (result == null) {
			throw new BusinessException("SYS001");
		}
				
		return result;
	}
	
	public static void setUser(Object user) {
		HttpSession session = HttpContext.getSession();
		
		session.setAttribute(USER, user);
	}
	
	public static long getEnterpriseId() {
		HttpSession session = HttpContext.getSession();
		Object retval = session.getAttribute(ENTERPRISEID);
		
		if (retval == null) {
			throw new BusinessException("SYS001");
		}
		
		return (Long)retval;
	}
	
	public static void setEnterpriseId(long enterpriseId) {
		HttpSession session = HttpContext.getSession();
		
		session.setAttribute(ENTERPRISEID, enterpriseId);
	}
	
	public static long getFlag() {
		HttpSession session = HttpContext.getSession();
		
		return (long)(Long)session.getAttribute(FLAG);
	}
	
	public static void setFlag(long flag) {
		HttpSession session = HttpContext.getSession();
		
		session.setAttribute(FLAG, flag);
	}
	
	public static void invalidate() {
		HttpSession session = HttpContext.getSession();
		
    	session.removeAttribute(USER);
    	session.removeAttribute(ROLE);
    	session.removeAttribute(ENTERPRISEID);
    	session.removeAttribute(FLAG);
    	session.invalidate();
	}
}
