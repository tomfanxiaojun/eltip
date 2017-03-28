package skycanopy.util;

import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


public class AuthenticationInterceptor extends HandlerInterceptorAdapter {
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
		if (!(handler instanceof HandlerMethod)) {
			return true;
		}
		
		HandlerMethod handlerMethod = (HandlerMethod)handler;
		Authentication authentication = handlerMethod.getMethodAnnotation(Authentication.class);
		boolean result = false;
 
		// 如果没有获取方法的注解，尝试获取类的注解
        if(authentication == null){
        	Object bean = handlerMethod.getBean();
        	
        	authentication = bean.getClass().getAnnotation(Authentication.class);
        }
    	
        if (authentication != null) {
	        // 判断是否有权限
	        Role userRole = AuthenHelper.getRole();
	        
	        for(Role role : authentication.value()) {
	        	if (role == userRole) {
	        		result = true;
	        		break;
	        	}
	        }
	        
	        // 处理Everyone的情况
	        if (!result) {
	        	for(Role role : authentication.value()) {
	            	if (role == Role.EVERYONE) {
	            		result = true;
	            	}
	            }
	        }
        }

        // 无权限的处理
        if (!result) {
        	response.setCharacterEncoding("utf-8");
            response.setContentType("text/html;charset=UTF-8");
            
            OutputStream out = response.getOutputStream();
            PrintWriter printWriter = new PrintWriter(new OutputStreamWriter(out, "utf-8"));
            
            printWriter.println("{\"message\":null,\"data\":\"SYS001\",\"success\":false}");
            printWriter.flush();
            printWriter.close();
        }
        
		return result;
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}
}
