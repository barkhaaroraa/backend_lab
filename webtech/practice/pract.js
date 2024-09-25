console.log("hello world");
function prime()
{
    var x=[];
    for(var i=1;i<100;i++)
    {
        var c=0;
        for(var j=2;j<i;j++)
        {
            if(i%j==0)
            {
                c=1;
                break;
                
            }
        }
        if(c==0)
        {
            x.push(i);
            console.log(i);
        }
                                                                                                                                                            
    }
}
prime();