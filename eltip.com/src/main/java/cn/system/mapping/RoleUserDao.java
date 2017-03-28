package cn.system.mapping;

import java.util.List;

import cn.system.model.RoleUser;

public interface RoleUserDao {
	public void add(RoleUser ru);
	public void updata(RoleUser ru);
	public void deleteById(Integer id);
	public RoleUser findById(Integer id);
	public List<RoleUser> findByUserId(Long userId);
}
