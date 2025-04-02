const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search, hash } = location;
    if (pathname.length > 1 && pathname.endsWith("/")) {
      const newPath = pathname.replace(/\/+$/, "");
      navigate(`${newPath}${search}${hash}`, { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      {routesConfig.map(({ path, element }) => (
        <Route key={path} path={`/${path}`} element={element} />
      ))}
      <Route path="*" element={<R404 />} />
    </Routes>
  );
};


