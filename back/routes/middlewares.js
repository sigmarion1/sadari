exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
};

exports.isAdminLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req?.user?.isAdmin) {
    next();
  } else {
    res.status(401).send('관리자 권한으로 로그인이 필요합니다.');
  }
};