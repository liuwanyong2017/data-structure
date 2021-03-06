//https://leetcode-cn.com/problems/partition-to-k-equal-sum-subsets/


// 排序算法
const sort = arr => {
    let start = 0, end = arr.length - 1, res = [];
    while (arr.length) {
        let min = arr[0], max = arr[0],
            minCount = 1, maxCount = 1;
        arr.map(
            (v, i) => {
                if (v > max) {
                    max = v;
                    maxCount = 1;
                } else if (v === max && i !== 0) {
                    maxCount += 1;
                }
                if (v < min) {
                    min = v;
                    minCount = 1;
                } else if (min === v && i !== 0) {
                    minCount += 1;
                }
            }
        );
        for (let i = start; i < start + minCount; i++) {
            // console.log(i,start,'sss');
            res[i] = min;
        }
        start += minCount;
        // console.log(minCount, 'mion', min,arr,end);

        for (let i = end; i > end - maxCount; i--) {
            res[i] = max;
        }
        end -= maxCount;
        arr = arr.filter(val => val !== min && val !== max);
        // console.log(start, 22, end);

        // console.log(min, max, minArr, maxArr);
        // minArr.map(
        //     (val) => {
        //         if (val === start) return start += 1;
        //         const index = maxArr.indexOf(start);
        //         index >= 0 && (maxArr[index] = val);
        //         arr[val] = arr[start];
        //         arr[start] = min;
        //         start += 1;
        //     }
        // );
        // // console.log(arr,'min');
        // for (let i = maxArr.length - 1; i >= 0; i--) {
        //     const index = maxArr[i];
        //     if (index === end - 1) return end -= 1;
        //     arr[index] = arr[end - 1];
        //     arr[end - 1] = max;
        //     end -= 1;
        // }
        // maxArr.map(
        //     (val) => {
        //         console.log(arr, end - 1, maxArr, val);
        //         const n = arr[end - 1];
        //         if (n === max) return;
        //         arr[end - 1] = max;
        //         arr[val] = n;
        //         end -= 1;
        //     }
        // );
        // console.log(res, "max", start, end);
    }
    return res;
};
// console.log(sort(
//     [2,2,10,5,2,7,2,2,13]
// ));

{
    const x = (arr, k) => {
        if (k <= 0 || k > arr.length || k > 16 || arr.length > 16) return false;
        let res = true;
        if (k === 1) return true;
        if (k === arr.length) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== arr[0]) {
                    res = false;
                    break;
                }
            }
            return res;
        }
        const all = arr.reduce(
            (a, b) => a + b, 0
        );

        let sum = all / k, count = 0;
        if (sum % 1 > 0) return false;
        arr = sort(arr);
        console.log(sum, arr, 8888);
        const search = (arr, sum) => {
            if (arr.length === 0) return;
            let val = sum - arr[arr.length - 1];
            arr.pop();
            if (val === 0) {
                count++;
            } else {
                if (val < arr[0]) {
                    arr = [];
                    return res = false;
                }
                const index = arr.indexOf(val);
                if (index >= 0) {
                    count++;
                    arr.splice(index, 1);
                } else {
                    if (k - count === 1) {
                        res = arr.reduce((a, b) => a + b, 0) === sum;
                        return arr = [];
                    }
                    const indexs = [], mins = [];
                    arr.map(
                        (num, i) => {
                            if (num < val) {
                                indexs.push(i);
                                mins.push(num);
                            }
                        }
                    );
                    const all = mins.reduce((a, b) => a + b, 0);
                    if (all === val) {
                        count++;
                        for (let i = indexs.length - 1; i >= 0; i--) {
                            arr.splice(indexs[i], 1);
                        }
                    } else if (all < val) {
                        arr = [];
                        return res = false;
                    } else {
                        val -= mins[mins.length - 1];

                    }
                }
            }
        };
        while (arr.length) {
            let val = sum - arr[arr.length - 1];
            arr.pop();
            if (val !== 0) {
                const index = arr.indexOf(val);
                if (index >= 0) {

                }
                val -= arr[0];
                arr.shift();
                const y = () => {
                    if (arr.length === 0) return res = false;
                    const index = Math.round((arr.length - 1) / 2);
                    val -= arr[index];
                    arr.splice(index, 1);
                    if (val === 0) {
                        return count += 1;
                    } else {
                        y();
                    }
                };
                if (val !== 0) {
                    y();
                } else {
                    count += 1;
                }
            } else {
                count += 1;
            }

            // console.log(arr);
        }
        res = false ? false : count === k;

        return res;

        // console.log(arr);


    };
    // console.log(x(
    //     [2, 2, 10, 5, 2, 7, 2, 2, 13],
    //     3
    //     )
    // );
}


//https://leetcode-cn.com/problems/add-two-numbers/

{
    class ListNode {
        constructor(val) {
            this.val = val || null;
            this.next = null;
        }
    }

    const res = new ListNode();
    let add = 0;
    const x = (l1, l2, node) => {
        if (!l1 && !l2) {
            return node.val = add;
        }
        let val1 = l1 ? l1.val : null, val2 = l2 ? l2.val : null, sum;
        val1 = val1 || 0;
        val2 = val2 || 0;
        sum = val1 + val2 + add;
        if (sum >= 10) {
            node.val = sum % 10;
            add = 1;
        } else {
            node.val = sum;
            add = 0;
        }


        let next1 = l1 ? l1.next : null, next2 = l2 ? l2.next : null;
        if (next1 !== null || next2 !== null || add > 0) {
            node.next = new ListNode();
            x(next1, next2, node.next);
        }
    };
    // x({val: 5}, {val: 5}, res);
    // console.log(res);
}
//https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/submissions/
{
    const x = n => {
        if (n <= 1) return n;
        if (n === 2) return 1;
        if (n === 3) return 2;
        let i = 4, val1 = 1, val2 = 2, current = 1;
        while (i < n) {
            if (current === 1) {
                val1 = (val1 + val2) % 1000000007;
                current = 2;
            } else {
                val2 = (val1 + val2) % 1000000007;
                current = 1;
            }
            i++;
        }
        let sum = (val1 + val2) % 1000000007;
        return sum;
    };
    console.log(x(81) / 1000000007);
}

{//https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/submissions/
    const w = (x, n) => {
        if (x === 0) return 0;
        if (x === 1) return 1;
        if (n === 1) return x;
        if (n === 0) return 1;
        if (x === -1) {
            return n % 2 === 0 ? 1 : -1;
        }
        let test = n > 1, i = 1;
        x = test ? x : 1 / x;
        let res = x;
        n = n > 0 ? n : -n;
        n -= 1;
        const arr = [];
        while (n > 0) {
            if (i + i < n) {
                res *= res;
                n -= i;
                i += i;
            } else {
                i = 1;
                arr.push(res);
                if (n === 1) {
                    arr.push(x);
                    n = 0;
                } else {
                    res = x;
                    n -= 1;
                }
            }
        }
        // console.log(arr);
        return arr.reduce((a, b) => a * b, 1);
    };
    console.log(w(2, 10));

    //最牛皮的答案：
    const z = (x, n) => {
        if (n === 0) return 1;
        let mid = n/2
        const test = mid % 1
        mid = test ? mid - test : mid
        const num = z(x, mid);
        return test ? num * num * x : num * num;
    };
    const m = (x, n) => {
        return n < 0 ? 1 / z(x, -n) : z(x, n);
    };
    console.log(m(2, 10));
}
//https://leetcode-cn.com/problems/super-egg-drop/submissions/ 二分法
{
    let count = 0
    const x = (k,n)=>{
        if(n===2) return count+=1;
        if(n===0) return;
        let mid = Math.round(n/2)
        count++
        x(k,n-mid)
    }
    x(1,1+1)
    console.log(count);
}