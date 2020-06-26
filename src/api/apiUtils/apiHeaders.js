
var header = {
  // Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNTcxNDkyNjgwLCJleHAiOjE1NzIzNTY2ODB9.tjpOMENg9Yz8WeXTaK3JttAO2B0iVn36bKFmrXjIT0RCwDSDDxJVd9vpW2MEElT_SKq2qBYoqQk-QQFUOTqVvw'
  // Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNTg1MjExODIzLCJleHAiOjE1ODYwNzU4MjN9.Wu1igDVc3KEGRK5A8nXPL_WUAdx0OXwFr0---mu4vzaJ0A8t1sLB1TXV5Fy5I_lc7aN7h66a5__TJDwjsIsqpA'
 Authorization: ''
}
export const setAuthHeaders = async (token) => {

  header = {
    ...header,
    Authorization: 'Bearer'+token 
    // Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNTg1MTMxNjU1LCJleHAiOjE1ODU5OTU2NTV9.MdoHakKddbFrrQFiFTzPRUwMDy9zzc2U2sNtTnYfJCaGJ9kcI22x9yCF5ErnTJG1QpQTQAayCqyKqW3eYi9s1w"
  }

}

export default header