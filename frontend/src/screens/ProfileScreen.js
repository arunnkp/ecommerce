import { getMyOrders, update } from "../api.js"
import { getUserInfo, setUserInfo , clearUser} from "../localStorage.js"
import { hideLoading, showLoading, showMessage } from "../utils.js"

const ProfileScreen={
    after_render:()=>{
        document.getElementById("signout-button").addEventListener("click",()=>{
            clearUser()
            document.location.hash='/'
        })
        document.getElementById('profile-form').addEventListener('submit',async(e)=>{
            e.preventDefault()
            showLoading()
            const data=await update({
                name:document.getElementById('name').value,
                email:document.getElementById('email').value,
                password:document.getElementById('password').value,
            })
            hideLoading()
            if(data.error){
                showMessage(data.error)
            }else{
                setUserInfo(data)
                document.location.hash='/'
            }
        })
    },
    render:async()=>{
        const {name,email,password}=getUserInfo()
    if(!name){
        document.location.hash='/'
    }
    const orders=await getMyOrders()
        return `
        <div class="content profile">
         <div class="profile-info">
         <div class="form-container">
         <form id="profile-form">
          <ul class="form-items">
           <li><h1>User Profile</h1></li>
           <li>
            <label for="name">Name</label>
            <input type="name" name="name" id="name" value="${name}" />
           </li>
           <li>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="${email}"/>
           </li>
           <li>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" value="${password}"/>
           </li>
           <li>
            <button type="submit" class="primary">Update</button>
           </li>
           <li>
            <button type="button" id="signout-button">Sign Out</button>
           </li>
          </ul>
         </form>
        </div>
         </div>
         <div class="profile-orders">
         <h2>Order History</h2>
         <table>
             <thead>
              <tr>
                <th>ORDER ID</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
             </thead>
             <tbody>
             ${orders.length===0?`<tr><td colspan="6">No Order Found.</td></tr>`:
             orders.map(order=>
                //this line will not work console.log('ProfileScreen price',order.TotalPrice);
                `<tr>
                        <td>${order.ProductId}</td>
                        <td>${order.TotalPrice}</td>
                        <td>${order.paidAt||'No'}</td>
                        <td>${order.deliveryAt||'No'}</td>
                        <td><a href="/#/order/${order.ProductId}">DETAILS</a></td>
                      </tr>`
             ).join('\n')
           }
           </tbody>
            </table>
         </div>
        </div>
        `
    }
}

export default ProfileScreen