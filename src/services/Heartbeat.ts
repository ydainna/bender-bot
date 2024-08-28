import http from "http";

export class Heartbeat {
  public static start(): void {
    http
      .createServer((req, res) => {
        if (req.url === "/heartbeatbender") {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("OK");
        }
      })
      .listen(3000);
  }
}
