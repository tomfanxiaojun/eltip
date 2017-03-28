package cn.system.service;

import java.util.List;

import cn.system.model.RoleUser;

public interface IRoleUserService {
	public void add(RoleUser ru);
	public void updata(RoleUser ru);
	public void deleteById(Integer id);
	public RoleUser findById(Integer id);
	public List<RoleUser> findByUserId(Long userId);
}
