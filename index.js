var n="global";
var permutation="global";
var array="global";
var pair1="global";
var pair2="global";
var countinv="global";
pair1=[0];
pair2=[0];
countinv=1;
function mergesort(array,temp,start,end)
{
	if(start<end)
	{
        var middle=Math.floor((start+end)/2);
        // document.write(start+" "+end+"\n");
        var p=mergesort(array,temp,start,middle); 
        var q=mergesort(array,temp,middle+1,end);
        var r=merge(array,temp,start,middle,end);
        return p+q+r;
	}
	else
		return 0;

}
function merge(array,temp,start,middle,end)
{
     var i=start;
     var j=middle+1;
     var k=start;

     var count=0;
     while(i<=middle &&  j<=end)
     	{
     		
     		if(array[i]<=array[j])
     		{
     			temp[k]=array[i];
     			k=k+1;
     			i=i+1;
     		}
     		
     		else
     		{
     			temp[k]=array[j];
     			count+=middle-i+1;
     			for(var pp=i;pp<=middle;pp++)
     			{
     				pair1[countinv]=array[pp];
     				pair2[countinv]=array[j];
     				countinv++;

     			}
     			k=k+1;
     			j=j+1;

     		}
     		

     		
     	}
     
     while(i<=middle)
     	{
     		temp[k]=array[i];
     		k=k+1;
     		i=i+1;
     	}	
 	 while(j<=end)
 	 	{
 	 		temp[k]=array[j];
     		k=k+1;
     		j=j+1;
 	 	}

 	 for(var i=start;i<=end;i=i+1)
 	 {
 	  	array[i]=temp[i];
 	 
 	  }
 	 	
 	  return count;
}
function endstatus(counteach,n)
{
	var count=0;
	for(var i=1;i<=n;i++)
	{
		if(counteach[i]==0)
			count++;
	}
	if(count==n)
		return true;
	else
		return false;
}
function takepermutation()
{
	// alert("hello");
	permutation=document.getElementById("perm").value.split(" ");
	n=permutation.length;
	array=new Array(n+1);
	temp=new Array(n+1);
	for(var i=1;i<=n;i++)
	{
		array[i]=permutation[i-1];
	}
	/*
	for(var i=1;i<=n;i++)
	{
		document.write(array[i]+"<br>");
	}
	*/
	
	var inversions=mergesort(array,temp,1,n);
	/*
	for(var i=1;i<=n;i++)
	{
		document.write(array[i]+"<br>");
	}

	for(var i=1;i<pair1.length;i++)
	{
		document.write(pair1[i]+" "+pair2[i]+"<br>");
	}
	*/
	var counteach=new Array(n+1);
	for(var i=1;i<=n;i++)
	{
		counteach[i]=0;
	}
	for(var i=1;i<pair1.length;i++)
	{
		counteach[pair1[i]]++;
		counteach[pair2[i]]++;
	}
	/*
	for(var i=1;i<=n;i++)
	{
		document.write(counteach[i]+"<br>");
	}
	*/
	var removed=new Array(n+1);
	for(var i=1;i<=n;i++)
	{
		removed[i]=0;
	}
	while(!endstatus(counteach,n))
	{
		var max=-1;
		var maxindex;
		for(var i=1;i<=n;i++)
		{
			if(removed[i]==0)
			{
				if(counteach[i]>=max)
				{
					max=counteach[i];
					maxindex=i;
				}
			}
		}
		for(var i=1;i<pair1.length;i++)
		{
			if(pair1[i]==maxindex||pair2[i]==maxindex)
			{
				if(counteach[pair1[i]]>0)
				counteach[pair1[i]]--;
				if(counteach[pair2[i]]>0)
				counteach[pair2[i]]--;
			}
		}
		removed[maxindex]=1;

	}
	/*
	for(var i=1;i<=n;i++)
	{
		if(removed[i]==0)
		document.write(i+"<br>");
	}
	*/
	
	

		var p=Raphael(0,0,1370,600);
		var rect=p.rect(267,150,800,300) ;
		rect.attr({stroke:"none"});
		var up=new Array(n+1);
        var down=new Array(n+1);
		for(var i=0;i<n;i++)
		{
			up[i]=p.circle( 267+i*(800/n)+400/n,150+(37.5),25);
            up[i].click(function(){up[i].animate({transform:"s2"},3000,"elastic");});
			up[i].attr({stroke:"#81F334","stroke-width":2.5,fill:"45-#f00-#000"});
			p.text(267+i*(800/n)+400/n,150-37.5,""+(i+1)).attr({fill:"white"});
		}
		var river=p.rect(0,260,1371,80);
		river.attr({fill:"#0FDCEE",stroke:"none"});
		for(var i=0;i<n;i++)
		{
		    down[i]=p.circle( 267+i*(800/n)+400/n,300+150-(37.5),25);
            down[i].click(function(){down[i].animate({transform:"s2"},3000,"elastic");});

			down[i].attr({stroke:"#81F334","stroke-width":2.5,fill:"45-#f00-#000"});
			var txt=p.text(267+i*(800/n)+400/n,450+37.5,""+permutation[i]).attr({fill:"white"});
            
		}
		var originalpos=new Array(n+1);
		for(var i=1;i<=n;i++)
		{
			originalpos[permutation[i-1]]=i;

		}
		for(var i=1;i<=n;i++)
		{
			if(removed[i]==0)
			{
				var startx=267+(i-1)*(800/n)+400/n;
				var starty=150+(37.5);
				var endx=267+(originalpos[i]-1)*(800/n)+400/n;
				var endy=450-37.5;
                /*
				for(var pp=0;pp<=100;pp++)
				{
					p.circle(startx+0.01*pp*(endx-startx),starty+0.01*pp*(endy-starty),1);
				}
                */
                var pt=p.path("M "+startx+" "+starty+" "+endx+" "+endy);
                pt.attr({stroke:"#ECF514","stroke-width":3});
			}
		}
		document.getElementById("firstheading").style.display="none";
		document.getElementById("secondheading").style.display="none";
		document.getElementById("cities").style.display="none";
		document.getElementById("perm").style.display="none";
		document.getElementById("button1").style.display="none";
		document.getElementById("button2").style.display="none";
		document.getElementById("button2").style.display="none";
		document.getElementById("caution").style.display="none";
		document.getElementById("tryagain").style.display="initial";
	
	
	
}




