package skycanopy.web;


@SuppressWarnings("serial")
public class JsonPageResult extends JsonResult {
	private int totalPage;
	private int currentPage;
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
}
