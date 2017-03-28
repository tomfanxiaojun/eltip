package skycanopy.web;

import org.springframework.beans.propertyeditors.PropertiesEditor;

public class ByteEditor extends PropertiesEditor {
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		 if (text != null) {
			 if (text.equals("")) {
				 text = "0";
			 } else if (text.equals("on")) {
				 text = "1";
			 }
		 }
		 
		 setValue(Byte.parseByte(text));  
	}
	
	@Override
	public String getAsText() {
		
		return getValue().toString();  
	}

}