import axios from 'axios'
import qs from 'qs'
function http(url, method, data, token){
    // const hostBase = 'http://service.ruizhixue.cn/ht/zjmovie/index.php'
    const hostBase = ''
    return new Promise((resolve, reject) => {
        if(method=='get'){
            axios({
                url: hostBase+url,
                method: method,
                params: data,
                headers:{
                    'token': token
                }
                }).then(response=>{
                    resolve(response)
                }).catch(err=>{
                    reject(err)
                })
        }else{
            axios({
                url: hostBase+url,
                method: method,
                data: data,
                headers:{
                    'token': token
                }
                }).then(response=>{
                    resolve(response)
                }).catch(err=>{
                    reject(err)
                })
        }
        
    })
}



function validPhone(phone){
    var myreg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
    return myreg.test(phone)
}
export {http,qs,validPhone} 