EXE = sandbox_exec

sandbox_exec:sandbox_exec.cpp sandbox.cpp filter.cpp sandbox.h filter.h configure.h sandbox_exec_help.cpp sandbox_exec.h
	g++ -NOMHY sandbox_exec.cpp sandbox.cpp filter.cpp sandbox_exec_help.cpp -o sandbox_exec -g -Wall

clean:
	rm sandbox_exec
