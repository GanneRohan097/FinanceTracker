let balance=document.getElementById('amount');
let incomeamount=document.getElementById('incomeamount');
let expenseamount=document.getElementById('expensesamount');
let list=document.getElementById('transactionlist');
let transactionform=document.getElementById('tform');
let description = document.getElementById("description");
let amount=document.getElementById('amount1');

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionform.addEventListener("submit", addTransaction);
function addTransaction(e){
    e.preventDefault();
    const des=description.value.trim();
    const money=parseFloat(amount.value);
    transactions.push({
        id:Date.now(),
        des,
        money

    })
    localStorage.setItem("transactions",JSON.stringify(transactions))
    updatetlist();
    updatesummary();
    transactionform.reset()
}
function updatetlist(){
    list.innerHTML='';
    let sortedlist=[...transactions].reverse();
    sortedlist.forEach((transaction)=>{
       list.appendChild(createTransactionElement(transaction));
    })
}
function createTransactionElement(t){
    let li=document.createElement('li');
    li.classList.add('transaction');
     li.id = "transaction";
    li.classList.add(t.money>0? "income" : 'expense');
    li.innerHTML=`
      <span>${t.des}</span>
      <span>${t.money}
       <button class='delete-btn' onclick='remove(${t.id})'>🗑️</button>
      </span>

    `
    return li;
}
function updatesummary(){
    let i=0,ex=0;
    transactions.forEach(t =>{
        if(t.money>0){
            i+=t.money;
        }
        else{
            ex+=t.money
        }
    })
    let bal=i+ex;
    balance.innerText=`₹ ${bal}`
    incomeamount.innerText=`₹ ${i}`
    expenseamount.innerText=`${Math.abs(ex)}`;
}
 function remove(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updatetlist();
    updatesummary();
}


updatetlist();
updatesummary();