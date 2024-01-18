/** 
* @param data：树形数组
* @param propertyName: 判断为空属性名
* @returns 过滤属性名为空之后的数组
*/
const removeEmptyItems = (data: any, propertyName: String) => {
	const newArr = [] as any;
	for (let i = 0; i < data.length; i++) {
		const item = data[i];
		if (item[`${propertyName}`] !== '') {
			if (Array.isArray(item?.children)) {
				item.children = removeEmptyItems(item.children, propertyName);
			}
			newArr.push(item);
		}
	}
	return newArr;
}

/**
 * 示例
 * 过滤arr中name为空
 * const arr = [ { name: '张三', age: 11 }, { name: '', age: 12 } ]
 * removeEmptyItems(arr, 'name') 
 */

