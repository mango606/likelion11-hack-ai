// 임시 네브바
import { NavLink } from "react-router-dom";

function Menu() {

      
      return(
            <div>
                  <div>
                        <NavLink to="/" >
                              메인
                        </NavLink>
                  </div>
                  <div>
                        <NavLink to="/Login" >
                              로그인
                        </NavLink>
                  </div>
                  
            </div>
      )
}

export default Menu;