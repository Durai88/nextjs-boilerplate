export default function Header() {
  return (
<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Kyber</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
    
      <li>
        <details>
          <summary>Home</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><a href="/en/about" >About</a></li>
            <li><a href="/en/user-otp" >User OTP</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
  );
}
