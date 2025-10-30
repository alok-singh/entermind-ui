import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import Input from '../../components/input';
import AppIcon from '../../icons/app-icon';
import { setLoading, setLogin, setPassword, setUserName } from '../../reducers/login-reducer';
import { Loader } from 'lucide-react';

import { LOGIN_KEY, USER_NAME, USER_SECRET } from '../../config/vars';
import { useEffect } from 'react';
import { getLocalStorageItem } from '../../utils/local-storage.util';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName, password, isLoading } = useSelector((state) => state.login.value);

  const handleLogin = () => {
    dispatch(setLoading(true));
    // TODO api trigger to validate login
    setTimeout(() => {
      navigate('/dashboard');
      dispatch(setLogin(true));
      dispatch(setLoading(false));
    }, 2000);
  };

  useEffect(() => {
    const isLoggedIn = getLocalStorageItem(LOGIN_KEY);
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, []);

  return isLoading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader className="w-[60px] h-[60px] animate-spin" color="#cfcecf" />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
      <div className="w-[392px]">
        <div className="flex flex-col items-center mb-12">
          <AppIcon className="mb-6 h-14" textClassName="text-[20px]" />
          <p className="text-gray-500 text-[14px]">AI P&L Platform</p>
        </div>
        <div className="p-10 shadow-xl bg-white border-radius-[11px] text-card-foreground flex flex-col rounded-xl border-0 gap-0">
          <div className="bg-white flex">
            <form className="w-full" onSubmit={handleLogin}>
              <Input id="email" type="email" placeholder="Email" required={true} value={userName} onChange={({ target }) => dispatch(setUserName(target.value))} className="mb-6" />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                required={true}
                onChange={({ target }) => dispatch(setPassword(target.value))}
                className="mb-6"
              />
              <Button type="submit" className="w-full bg-[#007aff] text-white p-3.5 text-[14px]">
                Sign In
              </Button>
            </form>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Button
              type="submit"
              className="text-white w-full p-5 rounded-xl bg-[#f5f5f7] hover:bg-gray-200 transition-colors text-center text-[14px]"
              onClick={() => {
                dispatch(setUserName(USER_NAME));
                dispatch(setPassword(USER_SECRET));
              }}
            >
              <div className="text-sm font-medium mb-1 text-[#007AFF] text-[12px]">Try Demo</div>
              <div className="text-xs text-gray-500 text-[12px]">
                {USER_NAME} • {USER_SECRET}
              </div>
            </Button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">Enterprise-grade security</p>
      </div>
    </div>
  );
};

export default LoginPage;
