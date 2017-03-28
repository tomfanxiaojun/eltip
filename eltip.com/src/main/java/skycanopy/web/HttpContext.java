package skycanopy.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class HttpContext {
    private static ThreadLocal<HttpContext> instance = new ThreadLocal<HttpContext>();
    private HttpServletRequest request;
    private HttpServletResponse response;

    private HttpContext(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
    }

    public static HttpContext getCurrent() {
        return instance.get();
    }

    public static HttpContext CreateInstance(HttpServletRequest request, HttpServletResponse response) {
        HttpContext httpContext = new HttpContext(request, response);
        
        instance.set(httpContext);
        
        return httpContext;
    }

    public void release() {
        instance.remove();
    }

    public static HttpServletRequest getRequest() {
    	HttpContext httpContext = instance.get();
    	
        return httpContext.request;
    }
    
    public static HttpServletResponse getResponse() {
    	HttpContext httpContext = instance.get();
    	
        return httpContext.response;
    }
    
    public static HttpSession getSession() {
    	HttpContext httpContext = instance.get();
    	
        return httpContext.request.getSession();
    }
}
