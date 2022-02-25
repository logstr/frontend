const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  return {
    currentUser,
    setCurrentUser,
    isLoggedIn: !!currentUser
  }
}