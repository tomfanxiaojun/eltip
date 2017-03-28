package cn.system.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import cn.system.mapping.RoleUserDao;
import cn.system.model.RoleUser;
import cn.system.service.IRoleUserService;
@Service("roleUserService")
public class RoleUserService implements IRoleUserService {
	@Autowired
	private RoleUserDao roleUserDao;

	@Override
	public void add(RoleUser ru) {
		roleUserDao.add(ru);
		
	}

	@Override
	public void updata(RoleUser ru) {
		roleUserDao.updata(ru);
		
	}

	@Override
	public void deleteById(Integer id) {
		roleUserDao.deleteById(id);
		
	}

	@Override
	public RoleUser findById(Integer id) {
		return roleUserDao.findById(id);
	}

	@Override
	public List<RoleUser> findByUserId(Long userId) {
		return roleUserDao.findByUserId(userId);
	}

	
	
}
