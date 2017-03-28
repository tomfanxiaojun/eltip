package skycanopy.util;

import java.util.List;

public class EcharsJsonResult {
	private Object tooltip;
	private Object legend;
	private Object toolbox;
	private boolean calculable;
	private List<Object> xAxis;
	private Object yAxis;
	private List<Object> series;
	private Object title;
	public Object getTooltip() {
		return tooltip;
	}
	public void setTooltip(Object tooltip) {
		this.tooltip = tooltip;
	}
	public Object getLegend() {
		return legend;
	}
	public void setLegend(Object legend) {
		this.legend = legend;
	}
	public Object getToolbox() {
		return toolbox;
	}
	public void setToolbox(Object toolbox) {
		this.toolbox = toolbox;
	}
	public boolean isCalculable() {
		return calculable;
	}
	public void setCalculable(boolean calculable) {
		this.calculable = calculable;
	}
	public List<Object> getxAxis() {
		return xAxis;
	}
	public void setxAxis(List<Object> xAxis) {
		this.xAxis = xAxis;
	}
	public Object getyAxis() {
		return yAxis;
	}
	public void setyAxis(Object yAxis) {
		this.yAxis = yAxis;
	}
	public List<Object> getSeries() {
		return series;
	}
	public void setSeries(List<Object> series) {
		this.series = series;
	}
	public Object getTitle() {
		return title;
	}
	public void setTitle(Object title) {
		this.title = title;
	}
	
}
