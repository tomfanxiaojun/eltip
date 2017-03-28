package skycanopy.web;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.propertyeditors.PropertiesEditor;

public class DateEditor extends PropertiesEditor {

	@Override
	public String getAsText() {
		Date value = (Date) getValue();
		
		if (null == value) {
			value = new Date();
		}
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		return df.format(value);
	}
	
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		Date value = null;
		
		if (null != text && !text.equals("")) {
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			try {
				value = df.parse(text);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		setValue(value);
	}

}
