package skycanopy.core;

import java.util.HashMap;
import java.util.Map;

public class DynamicProperty extends DirtyProperty{
	private Map<String, Object> properties;
	
	public DynamicProperty() {
		properties = new HashMap<String, Object>();
	}
	
	public Map<String, Object> getProperties() {
		return properties;
	}

	public Object getProperty(String name) {
    	return properties.get(name);
    }

    public void setProperty(String name, Object value) {
    	if (isSet(name)) {
    		Object originalValue = getProperty(name);
    		
    		setDirtyProperty(name, originalValue, value);
    	}
    	
    	properties.put(name, value);
    }

    public boolean isSet(String name) {
        return properties.containsKey(name);
    }
}
