package skycanopy.util;

import java.util.Hashtable;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionListener implements HttpSessionListener {

	Map<String, HttpSession> map = new Hashtable<String, HttpSession>();

    public void sessionCreated(HttpSessionEvent event) {
        HttpSession session = event.getSession();
        String id = session.getId();
        ServletContext context = session.getServletContext();
        session.setMaxInactiveInterval(60*60*24);
        map.put(id, session);
        context.setAttribute("sessionMap", map);
    }

    public void sessionDestroyed(HttpSessionEvent event) {
        HttpSession session = event.getSession();
        String id = session.getId();

        map.remove(id);
    }
}