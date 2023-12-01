#include <getopt.h>
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <string.h>
#include <unistd.h>
#include <netdb.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <errno.h>
#include <signal.h>
#include <pthread.h>
#define TIMEOUT_MS 400

typedef struct dataPacket
{
    char packet[256];
} DataPacket;

typedef struct dataFrame
{
    int kind;
    int seq_num;
    int ack;
    int pack_size;
    DataPacket dataPack;
} DataFrame;

void gbn_server(char *iface, long port, FILE *fp)
{

    int conn_in, sock_fd, op = 1, seq_n, recv_byte, bindVal;
    DataFrame ackPack, dataP;
    struct addrinfo *res, hints;
    socklen_t addrLen;
    char s_port[256];
    sprintf(s_port, "%ld", port);
    memset(&hints, 0, sizeof(struct addrinfo));

    hints.ai_flags = AI_PASSIVE;
    hints.ai_protocol = 0;
    hints.ai_socktype = SOCK_DGRAM;
    hints.ai_family = AF_UNSPEC;

    conn_in = getaddrinfo(iface, s_port, &hints, &res);
    if (conn_in != 0)
    {
        exit(1);
        printf("Connection Issue Server");
    }

    sock_fd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);

    if (sock_fd < 0)
    {
        printf('Socket error Server');
        exit(1);
    }

    int temp = setsockopt(sock_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &op, sizeof(op));

    if (temp < 0)
    {
        printf('Socket setup error');
    }

    bindVal = bind(sock_fd, res->ai_addr, res->ai_addrlen);

    if (bindVal < 0)
    {
        printf('Binding Error');
        exit(1);
    }

    addrLen = sizeof(res);

    ackPack.kind = 1;

    while ((recv_byte = recvfrom(sock_fd, &dataPack, sizeof(dataPack), 0, res->ai_addr, &addrLen)) > 0)
    {

        if (dataP.kind >= 0 && dataP.seq_num == seq_n)
        {
            fwrite(dataP.dataPack.packet, 1, dataP.pack_size, fp);
            ackPack.seq_num = seq_n;
            seq_n = seq_n + 1;
            sendto(sock_fd, &ackPack, sizeof(ackPack), 0, res->ai_addr, res->ai_addrlen);
            bzero(dataP.dataPack.packet, 256);
        }

        else if (dataP.kind != 0 && dataP.seq_num == seq_n)
        {
            fwrite(dataP.dataPack.packet, 1, dataP.pack_size, fp);
            ackPack.seq_num = seq_n;
            sendto(sock_fd, &ackPack, sizeof(ackPack), 0, res->ai_addr, res->ai_addrlen);
            seq_n = seq_n + 1;
            bzero(dataP.dataPack.packet, 256);
            close(sock_fd);
            break;
        }
    }
}

void gbn_client(char *host, long port, FILE *fp)
{

    int conn_in, sock_fd, recv_byte, seq_n = 0, a = 0, b = 0, ws = 2, pack = 0, t = 0, isCongest = 0;
    char s_port[256];
    struct addrinfo *res, hints;
    struct timeval timer;
    socklen_t addrLen;
    sprintf(s_port, "%ld", port);
    memset(&hints, 0, sizeof(struct addrinfo));

    hints.ai_flags = AI_PASSIVE;
    hints.ai_protocol = 0;
    hints.ai_socktype = SOCK_DGRAM;
    hints.ai_family = AF_UNSPEC;

    conn_in = getaddrinfo(host, s_port, &hints, &resr);
    if (conn_in != 0)
    {
        printf("Connection Error");
        exit(1);
    }

    sock_fd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
    if (sock_fd < 0)
    {
        printf("Socket error");
        exit(1);
    }

    timer.tv_sec = 0;
    timer.tv_usec = TIMEOUT_MS;

    addrLen = sizeof(res);
    DataFrame ackPack[256], dataP[256], buff;

    int temp = setsockopt(sock_fd, SOL_SOCKET, SO_RCVTIMEO, (char *)&timer, sizeof(struct timeval));

    if (temp < 0)
    {
        printf("Socket setup error");
        exit(1);
    }

    while (pack < ws)
    {
        bzero(dataP[pack].dataPack.packet, 256);
        t = fread(dataP[pack].dataPack.packet, 1, 256, fp);
        dataP[pack].kind = 0;

        if (t < 256)
        {
            dataP[pack].kind = 1;
            dataP[pack].seq_num = seq_n;
            dataP[pack].pack_size = t;
        }

        ackPack[pack].ack = 0;
        ackPack[pack].kind = 1;
        ackPack[pack].seq_num = seq_n;
        seq_n = seq_n + 1;
        pack = pack + 1;

        if (t < 256)
        {
            break;
        }
    }

    while (t == 256)
    {
        pack = 0;
        while (pack < ws)
        {
            sendto(sock_fd, &dataP[pack], sizeof(dataP[pack]), 0, res->ai_addr, res->ai_addrlen);
            pack = pack + 1;
        }

        pack = 0;
        while (pack < ws)
        {
            recv_byte = recvfrom(sock_fd, &buff, sizeof(buff), 0, res->ai_addr, &addrLen);
            if (recv_byte > 0)
            {
                for (a = 0; a < ws; a++)
                {
                    if (ackPack[a].seq_num == buff.seq_num)
                    {
                        ackPack[a].ack = 1;
                    }
                }
                pack = pack + 1;
            }

            for (a = 0; a < ws; a++)
            {
                if (ackPack[a].ack == 0)
                {
                    isCongest = 1;
                }
            }

            if (isCongest == 0)
            {
                ws += 1;
                t = fread(dataP[ws - 1].dataPack.packet, 1, 256, fp);
                ackPack[ws - 1].ack = 0;
                ackPack[ws - 1].frame_kind = 1;
                ackPack[ws - 1].sq_no = seq_n;
                dataP[ws - 1].sq_no = seq_n;
                dataP[ws - 1].packetSize = t;
                dataP[ws - 1].frame_kind = 0;
                seq_n = seq_n + 1;
            }

            isCongest = 1;
            pack = 0;

            while (1)
            {
                if (ackPack[0].ack == 1)
                {
                    for (a = 0, b = 1; a < ws && b < ws; a++, b++)
                    {
                        dataP[a] = dataP[b];
                        dataP[a] = dataP[b];
                    }
                }

                if (t < 256)
                {
                    dataP[ws - 1].kind = 1;
                    break;
                }

                bzero(dataP[ws - 1].dataPack.packet, 256);
                t = fread(dataP[WINDOWSIZE - 1].dataPack.packet, 1, 256, fp);
                ackPack[ws - 1].ack = 0;
                ackPack[ws - 1].frame_kind = 1;
                ackPack[ws - 1].sq_no = seq_n;
                dataP[ws - 1].sq_no = seq_n;
                dataP[ws - 1].packetSize = t;
                dataP[ws - 1].frame_kind = 0;
                seq_n = seq_n + 1;

                if (temp < 256)
                {
                    dataP[ws - 1].kind = 1;
                    break;
                }
            }
            else{
                break;
            }
        }
    }

    while(ackPack[ws-1].ack!=1){
        pack=0;
        while(pack<ws){
            sendto(sock_fd,&dataP[pack],sizeof(dataP[pack]),0, res->ai_addr, res->ai_addrlen);
            pack+=1;
        }
        pack=0;
        while(pack<ws){
            recv_byte = recvfrom(sock_fd, &buff, sizeof(buff), 0, res->ai_addr, &addrLen);
            if(recv_byte>0){
                for(a=0;a<ws;a++){
                    if(ackPack[a].seq_num == buff.seq_num){
                        ackPack[a].ack =1;
                    }
                }
                
            }
            pack = pack + 1
        }
    }
    close(sock_fd);
}