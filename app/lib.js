var lib  = {};

lib._floor = function(_number){
    try{
        return Math.floor(_number);
    }catch(e){
        return null;
    }
}

lib._ceil = function(_number){
    try{
        return Math.ceil(_number);
    }catch(e){
        return null;
    }
}

module.exports = lib;