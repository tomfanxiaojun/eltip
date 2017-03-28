package skycanopy.core;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class DirtyProperty {
	private boolean recordDirtySwitch;
	private Map<String, Object> dirtyProperties;

	public DirtyProperty() {
		dirtyProperties = new HashMap<String, Object>();
	}
	
	public void setRecordDirtySwitch(boolean value) {
		this.recordDirtySwitch = value;
	}
	
	public boolean getRecordDirtySwitch() {
		return this.recordDirtySwitch;
	}
	
	public void setDirtyProperty(String name, Object value) {
		if (this.recordDirtySwitch) {
			dirtyProperties.put(name, value);
		}
	}
	
	public void setDirtyProperty(String name, Object oldValue, Object newValue) {
		if (this.recordDirtySwitch) {
			if ((oldValue != null && !oldValue.equals(newValue)) 
					|| (newValue != null && !newValue.equals(oldValue))) {
				dirtyProperties.put(name, oldValue);
			}
		}
	}
	
	public Object getOriginalProperty(String name) {
		Object result = null;
		
		if (isDirty(name)) {
			result = dirtyProperties.get(name);
		} else {
			Class<?> cls = this.getClass();
			Field field = null;
			
			try {
				field = cls.getDeclaredField(name);
			} catch (SecurityException e) {
				e.printStackTrace();
			} catch (NoSuchFieldException e) {
				e.printStackTrace();
			}
			
			try {
				field.setAccessible(true);
				result = field.get(this);
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		
		return result;
	}
	
	public boolean isDirty(String name) {
		return dirtyProperties.containsKey(name);
	}
	
	public Map<String, Object> getDirtyProperties() {
		return dirtyProperties;
	}
}