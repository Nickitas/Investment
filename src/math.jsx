export const getInflation=(i,t)=>1/Math.pow(1+i,t);
export const DP=(r,z)=>r-z;
export const DDP = (r,z,i,t)=>getInflation(i,t)*DP(r,z);
export const defaultValue = {
    items:[],
    i:0,
    name:"Название"
}