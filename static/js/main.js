import './inc.js'
import { fetchData, refs } from './inc.js'
let jsonData = false

const nav_links = document.querySelectorAll('.left-link')
const nav_ul = document.querySelector('.left ul')
const search_input = document.querySelector('#search')
const search_result_div = document.querySelector('#search-result')


// add / remove active from nav link ----------------------------------------
const path_url = window.location.pathname
for(let link of nav_links){
    link.classList.remove('active')
    if(path_url == link.pathname){
        link.classList.add('active')
    }
}


// search -----------------------------------------------------------------
search_input.addEventListener('keyup', (e) => {
    let search_value = search_input.value
    if (search_value.length > 0) {
        // clean search result div to clean any old search result
        search_result_div.innerHTML=''
        // create orders div and add class to it
        let ordersE = document.createElement('div')
        ordersE.className = 'orders'
        // create title element and add to search result
        let newTitleE = document.createElement('div')
        newTitleE.className = 'title'
        newTitleE.innerHTML = `<h2>Search Result: <span>${search_value.replace('+',' ')}</span></h2>`
        search_result_div.appendChild(newTitleE)
        // create loading div and append to search result div
        let loading = document.createElement('div')
        loading.className = 'loading'
        search_result_div.appendChild(loading)
        // url to fetch 
        let url = `/search.json?q=${search_value.replace(' ','+')}`
        fetchData(url).then(data=>{
            for(let orderData of data){
                // create order element
                let newOrderE = document.createElement('div')
                newOrderE.className = 'order'
                newOrderE.dataset.id = orderData['id']
                //
                let newOrderEHtml = `
                <div class="order-id">
                    <div>ID</div>
                    <div class="c-gray">${orderData['id']}</div>
                </div>
                <div class="order-ref">
                    <div>Ref</div>
                    <img src="${refs[orderData['ref']]}" alt="bootstrap">
                </div>
                <div class="order-status">
                    <div>Status</div>
                    <div class="${orderData['status']}">${orderData['status']}</div>
                </div>
                <div class="order-date">
                    <div>Date</div>
                    <div class="c-gray">${orderData['date']}</div>
                </div>`
                // add html to new order element
                newOrderE.innerHTML=newOrderEHtml
                // add new orderE to ordersE
                ordersE.appendChild(newOrderE)
            }
            // if orders div in result div remove it
            if(search_result_div.querySelector('.orders')){
                search_result_div.querySelector('.orders').remove()
            }
            // render app
            search_result_div.append(ordersE)
            // remove loading animation when fetch is completed
            loading.remove()
            // click orders to go to order link
            const ordersList = document.querySelector('.orders')
            ordersList.addEventListener('click',(e)=>{
                let eTarget = e.target
                if(eTarget.classList.contains('order')){
                    let orderId = eTarget.dataset.id
                    // go to url
                    window.location.href = `/orders/edit/${orderId}/`
                }
            })
    

        })
    } else if (search_value.length == 0) {
        search_result_div.innerHTML = ''
    }

    

})


// dashboard stats -------------------------------------------
const stats = document.querySelector('.orders-stats')
if(stats){
    stats.addEventListener('click',(e)=>{
        const eTarget = e.target
        // only run if element target include stat class
        if(eTarget.classList.contains('stat')){
            const eTargetUrl = eTarget.dataset.href
            window.location.href = eTargetUrl
        }
    })
}
// click orders to go to order link ---------------------------
const ordersList = document.querySelector('.orders')
if(ordersList){
    ordersList.addEventListener('click',(e)=>{
        let eTarget = e.target
        if(eTarget.classList.contains('order')){
            let orderId = eTarget.dataset.id
            // go to url
            window.location.href = `/orders/edit/${orderId}/`
        }
    })
}
