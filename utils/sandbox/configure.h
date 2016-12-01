#ifndef __TUOJ_CONFIGURE_H__
#define __TUOJ_CONFIGURE_H__

#ifdef NOMHY
#define DEFAULT_HOME_PATH "/home/laekov/tuoj/tuoj-judger/utils/sandbox"
#define DEFAULT_WHITELIST_PATH "/home/laekov/tuoj/tuoj-judger/utils/sandbox/whitelist"
#define HOME_PATH "."
#define RUN_PATH HOME_PATH ""
#define SHARED_PATH HOME_PATH ""
#define TMP_PATH HOME_PATH ""
#else
#define DEFAULT_HOME_PATH "/home/mhy12345/thusaac/utils/sandbox"
#define DEFAULT_WHITELIST_PATH "/home/mhy12345/thusaac/utils/sandbox/whitelist"
#define HOME_PATH "/home/mhy12345/thusaac/utils/sandbox"
#define RUN_PATH HOME_PATH ""
#define SHARED_PATH HOME_PATH ""
#define TMP_PATH HOME_PATH ""
#endif
#define MAXBUF 250

#ifdef __x86_64__
typedef unsigned long long int reg_val_t;
#define REG_SYSCALL orig_rax 
#define REG_RET rax
#define REG_ARG0 rdi
#define REG_ARG1 rsi
#define REG_ARG2 rdx
#define REG_ARG3 rcx
#else
typedef long int reg_val_t;
#define REG_SYSCALL orig_eax
#define REG_RET eax
#define REG_ARG0 ebx
#define REG_ARG1 ecx
#define REG_ARG2 edx
#define REG_ARG3 esx
#endif
#define RS_SYE 10
#define RS_NOR 0
#define RS_AC 1
#define RS_TLE 2
#define RS_RE 3
#define RS_MLE 4
#define RS_WA 5
#define RS_CE 6
#define RS_FE 7
#define RS_DGP 8

#endif

