program prog2;
var
		a,b:integer;
Begin
assign(input,'input.txt');reset(input);
assign(output,'output.txt');rewrite(output);
read(a,b);
writeln(a+b);
End.
