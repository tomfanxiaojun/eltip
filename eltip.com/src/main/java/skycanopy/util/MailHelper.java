package skycanopy.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.ui.velocity.VelocityEngineFactoryBean;
import org.springframework.ui.velocity.VelocityEngineUtils;

@Component
public class MailHelper {

	public MailHelper() throws VelocityException, IOException {
		velocityEngine = getVelocityEngine();
	}
	
	private VelocityEngine velocityEngine;
	
	@Autowired
    public void setVelocityEngine(VelocityEngine velocityEngine)
    {
       this.velocityEngine = velocityEngine;
    }
	
	public class MailProperty {
		public String host;
		public String protocol;
		public String auth;
		public String user;
		public String password;
	}
	
	private MailProperty mailProperty = null;
	
	public VelocityEngine getVelocityEngine() throws VelocityException, IOException{
		VelocityEngineFactoryBean factory = new VelocityEngineFactoryBean();
		Properties props = new Properties();
		props.put("resource.loader", "class");
		props.put("class.resource.loader.class", 
				  "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
		factory.setVelocityProperties(props);
		
		return factory.createVelocityEngine();
	}
	
	private void readProperties() throws IOException {
		if (mailProperty == null) {
	 		mailProperty = new MailHelper.MailProperty();
			InputStream inputStream = null;
			
			try {
				Properties prop = new Properties();
				String propFileName = "mail.properties";
	 
				inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
	 
				if (inputStream != null) {
					prop.load(inputStream);
				} else {
					throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
				}
	
				mailProperty.host = prop.getProperty("mail.host");
				mailProperty.protocol = prop.getProperty("mail.transport.protocol");
				mailProperty.auth = prop.getProperty("mail.smtp.auth");
				mailProperty.user = prop.getProperty("mail.user");
				mailProperty.password = prop.getProperty("mail.password");
				
			} catch (Exception e) {
				System.out.println("Exception: " + e);
			} finally {
				inputStream.close();
			}
		}
	}
	/**
	 * 
	 * @param receiver 发送地址
	 * @param subject  主题
	 * @param vmfile 模板名称
	 * @param model 发送内容
	 * @throws Exception
	 */
    public void sendMail(String receiver, String subject, String vmfile, 
    		Map<String, Object> model) throws Exception {
        Properties prop = new Properties();
        readProperties();
        
        prop.setProperty("mail.host", mailProperty.host);
        prop.setProperty("mail.transport.protocol", mailProperty.protocol);
        prop.setProperty("mail.smtp.auth", mailProperty.auth);

        Session session = Session.getInstance(prop);
        session.setDebug(false);
        Transport ts = session.getTransport();
        
        ts.connect(mailProperty.host, mailProperty.user, mailProperty.password);
        MimeMessage message = new MimeMessage(session);
        String text = VelocityEngineUtils.mergeTemplateIntoString(
        		velocityEngine, vmfile, "UTF-8", model);

        message.setFrom(new InternetAddress(mailProperty.user));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(receiver));
        message.setSubject(subject);
        message.setContent(text, "text/html;charset=UTF-8");
        
        ts.sendMessage(message, message.getAllRecipients());
        ts.close();
    }
    
    
}
