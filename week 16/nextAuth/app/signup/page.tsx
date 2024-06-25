
function page() {
  return (
    <div>
      <label htmlFor="username">username</label>
      <input type="text" name="username" />
      <br /><br />

      <label htmlFor="password">password</label>
      <input type="password" name="password" />
      <br /><br />

      <button>Signup</button>
    </div>
  )
}

export default page