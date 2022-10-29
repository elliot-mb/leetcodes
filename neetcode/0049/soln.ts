function isAnagram(a: string, b: string): boolean {
    if(a.length !== b.length) return false;
    let map = new Map<string, number>();
    for(let i = 0; i < a.length; i++){
        let aChar: string = a.charAt(i);
        let bChar: string = b.charAt(i);
        let n: number | undefined = map.get(aChar);
        map.set(aChar, n === undefined ? 1 : n + 1);
        let m: number | undefined = map.get(bChar);
        map.set(bChar, m === undefined ? -1 : m - 1);
    }
    let balanced: boolean = true;
    map.forEach((entry) => {
        if(entry !== 0) balanced = false;
    });

    return balanced;
}

function id(str: string, i: number): string{
    return `${str}${i}`;
}

//valid but too slow 

function groupAnagrams(strs: string[]): string[][] {
    //console.log(isAnagram("rute", "true"));
    let groups: string[][] = [];
    let grouped: {[key: string]: null} = {};
    for(let i = 0; i < strs.length; i++){
        let a = strs[i];
        if(grouped[id(a, i)] === undefined){
            grouped[id(a, i)] = null; //matched
            groups.push([a]);
            for(let j = i; j < strs.length; j++){
                let b = strs[j];
                if(grouped[id(b, j)] === undefined && isAnagram(a, b)){
                    grouped[id(b, j)] = null;
                    groups[groups.length - 1].push(b);
                }
            }
        }
    }
    return groups;
};